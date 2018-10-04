require 'rails_helper'

RSpec.describe 'Map layers', type: :request do
  before do
    Api::V3::MapAttributeGroup.skip_callback(:commit, :after, :refresh_dependents)
    Api::V3::MapAttribute.skip_callback(:commit, :after, :refresh_dependents)
  end
  after do
    Api::V3::MapAttributeGroup.set_callback(:commit, :after, :refresh_dependents)
    Api::V3::MapAttribute.set_callback(:commit, :after, :refresh_dependents)
  end
  include_context 'api v3 brazil contextual layers'
  include_context 'api v3 brazil map attributes'

  describe 'GET /api/v3/contexts/:context_id/map_layers' do
    before(:each) do
      Api::V3::Readonly::Attribute.refresh
      Api::V3::Readonly::MapAttribute.refresh
    end

    it 'requires start_year' do
      get "/api/v3/contexts/#{api_v3_context.id}/map_layers"

      expect(@response).to have_http_status(:bad_request)
      expect(JSON.parse(@response.body)).to eq(
        'error' => 'param is missing or the value is empty: Required param start_year missing'
      )
    end

    it 'has the correct response structure' do
      get "/api/v3/contexts/#{api_v3_context.id}/map_layers?start_year=2014"

      expect(@response).to have_http_status(:ok)
      expect(@response).to match_response_schema('v3_map_layers')
    end
  end
end
