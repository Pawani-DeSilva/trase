module Api
  module V3
    module Dashboards
      class FilterSources < BaseFilter
        include CallWithQueryTerm

        def initialize(params)
          @self_ids = params.delete(:sources_ids)
          super(params)
        end

        private

        def initialize_query
          @query = Api::V3::Readonly::Dashboards::Source.
            select(
              :id,
              :name,
              :node_type,
              :parent_name,
              :parent_node_type
            ).
            group(
              :id,
              :name,
              :node_type,
              :parent_name,
              :parent_node_type
            )
        end
      end
    end
  end
end
