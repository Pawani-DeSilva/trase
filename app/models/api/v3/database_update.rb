# == Schema Information
#
# Table name: database_updates
#
#  id         :bigint(8)        not null, primary key
#  stats      :json
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  jid        :text
#  status     :text             default("STARTED"), not null
#  error      :text
#
# Indexes
#
#  database_updates_jid_key          (jid) UNIQUE
#  index_database_updates_on_status  (status) UNIQUE WHERE (status = 'STARTED'::text)
#

module Api
  module V3
    class DatabaseUpdate < BaseModel
      STARTED = 'STARTED'.freeze
      FINISHED = 'FINISHED'.freeze
      FAILED = 'FAILED'.freeze

      validate :only_one_update_started
      scope :started, -> { where(status: STARTED) }

      def stats_to_ary
        return [] unless stats.present?

        ary = []
        elapsed_seconds = stats.delete('elapsed_seconds')
        elapsed_seconds&.map do |key, value|
          ary << "DURATION #{key}: #{value} seconds"
        end
        stats.each do |blue_table, blue_stats|
          b_line = "#{blue_table}: "
          b_line << blue_stats.except('yellow_tables').keys.map do |key|
            "#{key.upcase}: #{blue_stats[key]}"
          end.join(', ')
          ary << b_line
          blue_stats['yellow_tables']&.each do |yellow_table, yellow_stats|
            y_line = "#{yellow_table}: "
            y_line << yellow_stats.keys.map do |key|
              "#{key.upcase}: #{yellow_stats[key]}"
            end.join(', ')
            ary << y_line
          end
        end
        ary
      end

      def stats_to_s
        stats_to_ary.map { |line| "#{line}\n" }.join('')
      end

      def update_stats(stats)
        update_attribute(:stats, stats)
      end

      def finished_at
        [FINISHED, FAILED].include?(status) && updated_at || nil
      end

      def finished_with_error(error, stats)
        update_columns(
          status: FAILED,
          error: error.message,
          stats: stats,
          updated_at: current_time_from_proper_timezone
        )
      end

      def finished_with_success(stats)
        update_columns(
          status: FINISHED,
          stats: stats,
          updated_at: current_time_from_proper_timezone
        )
      end

      protected

      def started?
        status == STARTED
      end

      def only_one_update_started
        return unless started?

        matches = DatabaseUpdate.started
        matches = matches.where('id != ?', id) if persisted?
        errors.add(:started, 'cannot start another update') if matches.exists?
      end
    end
  end
end
