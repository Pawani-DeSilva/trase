# == Schema Information
#
# Table name: quant_context_properties
#
#  id           :bigint(8)        not null, primary key
#  tooltip_text :text             not null
#  context_id   :bigint(8)        not null
#  quant_id     :bigint(8)        not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_quant_context_properties_on_context_id  (context_id)
#  index_quant_context_properties_on_quant_id    (quant_id)
#
# Foreign Keys
#
#  fk_rails_...  (context_id => contexts.id) ON DELETE => cascade ON UPDATE => cascade
#  fk_rails_...  (quant_id => quants.id) ON DELETE => cascade ON UPDATE => cascade
#

module Api
  module V3
    class QuantContextProperty < YellowTable
      belongs_to :context
      belongs_to :quant

      validates :context, presence: true
      validates :quant, presence: true, uniqueness: {scope: :context}
      validates :tooltip_text, presence: true

      after_commit :refresh_dependents

      def self.blue_foreign_keys
        [
          {name: :quant_id, table_class: Api::V3::Quant},
          {name: :context_id, table_class: Api::V3::Context}
        ]
      end

      def refresh_dependents
        Api::V3::Readonly::ContextAttributeProperty.refresh
      end
    end
  end
end
