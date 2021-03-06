require 'rails_helper'

RSpec.describe 'Profile metadata', type: :request do
  include_context 'api v3 brazil flows quants'
  include_context 'api v3 brazil municipality place profile'

  describe 'GET /api/v3/contexts/:context_id/nodes/:node_id/profile_metadata' do
    it 'has the correct response structure for countries' do
      get "/api/v3/contexts/#{api_v3_context.id}/nodes/#{api_v3_municipality_node.id}/profile_metadata"

      expect(@response).to have_http_status(:ok)
      expect(@response).to match_response_schema('v3_profile_metadata')
    end
  end
end
