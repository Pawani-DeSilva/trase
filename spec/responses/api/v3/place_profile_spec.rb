require 'rails_helper'

RSpec.describe 'Place profile', type: :request do
  include_context 'api v3 brazil municipality ind values'
  include_context 'api v3 brazil municipality qual values'
  include_context 'api v3 brazil municipality quant values'
  include_context 'api v3 brazil flows quants'
  include_context 'api v3 brazil municipality place profile'

  before(:each) do
    Api::V3::Readonly::Attribute.refresh(sync: true, skip_dependents: true)
    Api::V3::Readonly::ChartAttribute.refresh(sync: true, skip_dependencies: true)
    Api::V3::Readonly::Node.refresh(sync: true, skip_dependencies: true)
  end

  let(:summary_params) {
    {
      year: 2015
    }
  }

  describe 'GET /api/v3/contexts/:context_id/places/:id/basic_attributes' do
    it 'validates node types' do
      expect { get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_country_of_destination1_node.id}/basic_attributes" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_exporter1_node.id}/basic_attributes" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_importer1_node.id}/basic_attributes" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_port1_node.id}/basic_attributes" }.to raise_error(ActiveRecord::RecordNotFound)

      expect { get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_municipality_node.id}/basic_attributes" }.to_not raise_error
      expect { get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_logistics_hub_node.id}/basic_attributes" }.to_not raise_error
      expect { get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_biome_node.id}/basic_attributes" }.to_not raise_error
      expect { get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_state_node.id}/basic_attributes" }.to_not raise_error
    end

    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_municipality_node.id}/basic_attributes", params: summary_params

      expect(@response.status).to eq 200
      expect(@response).to match_response_schema('v3_place_basic_attributes')
    end
  end

  describe 'GET /api/v3/contexts/:context_id/places/:id/top_consumer_actors' do
    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_municipality_node.id}/top_consumer_actors", params: summary_params

      expect(@response.status).to eq 200
      expect(@response).to match_response_schema('v3_place_top_consumer_actors')
    end
  end

  describe 'GET /api/v3/contexts/:context_id/places/:id/top_consumer_countries' do
    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_municipality_node.id}/top_consumer_countries", params: summary_params

      expect(@response.status).to eq 200
      expect(@response).to match_response_schema('v3_place_top_consumer_countries')
    end
  end

  describe 'GET /api/v3/contexts/:context_id/places/:id/indicators' do
    before(:each) do
      Api::V3::Readonly::Attribute.refresh(sync: true, skip_dependents: true)
      Api::V3::Readonly::ChartAttribute.refresh(sync: true, skip_dependencies: true)
      Api::V3::Readonly::ContextAttributeProperty.refresh(sync: true, skip_dependencies: true)
      Api::V3::Readonly::CountryAttributeProperty.refresh(sync: true, skip_dependencies: true)
      Api::V3::Readonly::CommodityAttributeProperty.refresh(sync: true, skip_dependencies: true)
    end
    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_municipality_node.id}/indicators", params: summary_params

      expect(@response.status).to eq 200
      expect(@response).to match_response_schema('v3_place_indicators')
    end
  end

  describe 'GET /api/v3/contexts/:context_id/places/:id/trajectory_deforestation' do
    before(:each) do
      Api::V3::Readonly::Attribute.refresh(sync: true, skip_dependents: true)
      Api::V3::Readonly::ChartAttribute.refresh(sync: true, skip_dependencies: true)
      Api::V3::Readonly::ContextAttributeProperty.refresh(sync: true, skip_dependencies: true)
      Api::V3::Readonly::CountryAttributeProperty.refresh(sync: true, skip_dependencies: true)
      Api::V3::Readonly::CommodityAttributeProperty.refresh(sync: true, skip_dependencies: true)
    end
    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/places/#{api_v3_municipality_node.id}/trajectory_deforestation", params: summary_params

      expect(@response.status).to eq 200
      expect(@response).to match_response_schema('v3_place_trajectory_deforestation')
    end
  end
end
