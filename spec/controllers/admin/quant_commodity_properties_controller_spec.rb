require 'rails_helper'

RSpec.describe Admin::QuantCommodityPropertiesController, type: :controller do
  render_views

  let(:user) { FactoryBot.create(:user) }
  before { sign_in user }

  describe 'POST create' do
    let(:quant) { FactoryBot.create(:api_v3_quant) }
    let(:quant_2) { FactoryBot.create(:api_v3_quant) }

    let(:commodity) { FactoryBot.create(:api_v3_commodity) }
    let(:commodity_2) { FactoryBot.create(:api_v3_commodity) }

    let(:tooltip_text) { 'Tooltip text' }

    let!(:quant_commodity_property) {
      FactoryBot.create(
        :api_v3_quant_commodity_property,
        quant_id: quant_2.id,
        commodity_id: commodity_2.id,
        tooltip_text: tooltip_text
      )
    }

    let(:duplicate) {
      FactoryBot.attributes_for(
        :api_v3_quant_commodity_property,
        quant_id: quant_2.id,
        commodity_id: commodity_2.id,
        tooltip_text: tooltip_text
      )
    }

    let(:valid_attributes) {
      FactoryBot.attributes_for(
        :api_v3_quant_commodity_property,
        quant_id: quant.id,
        commodity_id: commodity.id,
        tooltip_text: tooltip_text
      )
    }

    let(:no_quant_provided) {
      FactoryBot.attributes_for(
        :api_v3_quant_commodity_property,
        quant_id: nil,
        commodity_id: commodity.id,
        tooltip_text: tooltip_text
      )
    }

    let(:no_commodity_provided) {
      FactoryBot.attributes_for(
        :api_v3_quant_commodity_property,
        quant_id: quant.id,
        commodity_id: nil,
        tooltip_text: tooltip_text
      )
    }

    let(:no_tooltip_provided) {
      FactoryBot.attributes_for(
        :api_v3_quant_commodity_property,
        quant_id: quant.id,
        commodity_id: commodity.id,
        tooltip_text: nil
      )
    }

    it 'clears cache' do
      expect(controller).to receive(:clear_cache_for_regexp)
      post :create, params: {api_v3_quant_commodity_property: valid_attributes}
    end

    it 'fails if quant is not provided' do
      post :create, params: {api_v3_quant_commodity_property: no_quant_provided}
      expect(response).to render_template(:new)
    end

    it 'fails if commodity is not provided' do
      post :create, params: {api_v3_quant_commodity_property: no_commodity_provided}
      expect(response).to render_template(:new)
    end

    it 'fails if tooltip is not provided' do
      post :create, params: {api_v3_quant_commodity_property: no_tooltip_provided}
      expect(response).to render_template(:new)
    end

    it 'fails if property with commodity and quant are already coupled' do
      post :create, params: {api_v3_quant_commodity_property: duplicate}
      expect(response).to render_template(:new)
    end

    it 'renders index' do
      get :index
      expect(response).to render_template(:index)
    end

    it 'renders show' do
      get :show, params: {id: quant_commodity_property.id}
      expect(response).to render_template(:show)
    end
  end
end
