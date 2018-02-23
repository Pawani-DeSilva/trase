# Prepares checks to be run on qual objects

# The following checks are included:
#   check +qual_property+ present
#   if temporal set check year present, if not set check year absent
#   check tooltip text present (WARN)
module Api
  module V3
    module DatabaseValidation
      module ChainBuilders
        class QualChainBuilder < AbstractChainBuilder
          checks :has_exactly_one,
                 association: :qual_property,
                 link: :index
          checks :declared_temporal_matches_data,
                 association: :node_quals,
                 attribute: :is_temporal_on_actor_profile,
                 on: :qual_property,
                 link: :edit
          checks :declared_temporal_matches_data,
                 association: :node_quals,
                 attribute: :is_temporal_on_place_profile,
                 on: :qual_property,
                 link: :edit
          checks :attribute_present,
                 attribute: :tooltip_text,
                 on: :qual_property,
                 link: :edit,
                 severity: :warn

          def self.build_chain
            chain = []
            Api::V3::Qual.all.each do |qual|
              chain += new(
                qual, @errors_list
              ).chain
            end
            chain
          end
        end
      end
    end
  end
end
