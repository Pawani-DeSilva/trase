require 'rails_helper'

RSpec.describe 'Importer profile', type: :request do
  include_context 'api v3 brazil importer quant values'
  include_context 'api v3 brazil importer qual values'
  include_context 'api v3 brazil importer ind values'
  include_context 'api v3 brazil municipality quant values'
  include_context 'api v3 brazil municipality qual values'
  include_context 'api v3 brazil municipality ind values'
  include_context 'api v3 brazil flows'
  include_context 'api v3 brazil flows quants'
  include_context 'api v3 brazil importer actor profile'

  let(:summary_params) {
    {
      year: 2015
    }
  }

  describe 'GET /api/v3/contexts/:context_id/nodes/:id/actor' do
    before(:each) do
      Api::V3::Readonly::Attribute.refresh
      Api::V3::Readonly::ChartAttribute.refresh
    end
    it 'validates node types' do
      expect { get "/api/v3/contexts/#{api_v3_context.id}/nodes/#{api_v3_country_of_destination1_node.id}/actor" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/nodes/#{api_v3_port1_node.id}/actor" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/nodes/#{api_v3_municipality_node.id}/actor" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/nodes/#{api_v3_logistics_hub_node.id}/actor" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/nodes/#{api_v3_biome_node.id}/actor" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/nodes/#{api_v3_state_node.id}/actor" }.to raise_error(ActiveRecord::RecordNotFound)

      expect { get "/api/v3/contexts/#{api_v3_context.id}/nodes/#{api_v3_importer1_node.id}/actor" }.to_not raise_error
    end

    it 'requires year' do
      get "/api/v3/contexts/#{api_v3_context.id}/nodes/#{api_v3_importer1_node.id}/actor"

      expect(@response).to have_http_status(:bad_request)
      expect(JSON.parse(@response.body)).to eq(
        'error' => 'param is missing or the value is empty: Required param year missing'
      )
    end

    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/nodes/#{api_v3_importer1_node.id}/actor", params: summary_params

      expect(@response).to have_http_status(:ok)
      expect(@response).to match_response_schema('importer_profile')
    end
  end

  describe 'GET /api/v3/contexts/:context_id/actors/:id/basic_attributes' do
    it 'validates node types' do
      expect { get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_country_of_destination1_node.id}/basic_attributes" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_port1_node.id}/basic_attributes" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_municipality_node.id}/basic_attributes" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_logistics_hub_node.id}/basic_attributes" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_biome_node.id}/basic_attributes" }.to raise_error(ActiveRecord::RecordNotFound)
      expect { get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_state_node.id}/basic_attributes" }.to raise_error(ActiveRecord::RecordNotFound)

      expect { get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_importer1_node.id}/basic_attributes" }.to_not raise_error
    end

    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_importer1_node.id}/basic_attributes", params: summary_params

      expect(@response.status).to eq 200
      expect(@response).to match_response_schema('v3_actor_basic_attributes')
    end
  end

  describe 'GET /api/v3/contexts/:context_id/actors/:id/top_countries' do
    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_importer1_node.id}/top_countries", params: summary_params

      expect(@response.status).to eq 200
      expect(@response).to match_response_schema('v3_actor_top_countries')
    end
  end

  describe 'GET /api/v3/contexts/:context_id/actors/:id/top_sources' do
    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_importer1_node.id}/top_sources", params: summary_params

      expect(@response.status).to eq 200
      expect(@response).to match_response_schema('v3_actor_top_sources')
    end
  end

  describe 'GET /api/v3/contexts/:context_id/actors/:id/sustainability' do
    before(:each) do
      Api::V3::Readonly::Attribute.refresh
      Api::V3::Readonly::ChartAttribute.refresh
    end
    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_importer1_node.id}/sustainability", params: summary_params

      expect(@response.status).to eq 200
      expect(@response).to match_response_schema('v3_actor_sustainability')
    end
  end

  describe 'GET /api/v3/contexts/:context_id/actors/:id/exporting_companies' do
    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/actors/#{api_v3_importer1_node.id}/exporting_companies", params: summary_params

      expect(@response.status).to eq 200
      expect(@response).to match_response_schema('v3_actor_exporting_companies')
    end
  end
end
