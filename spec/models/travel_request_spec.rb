# spec/models/travel_request_spec.rb

require 'rails_helper'

RSpec.describe TravelRequest, type: :model do
  let(:user) { create(:user) }
  let(:travel) { create(:travel) }
  let(:travel_request) { create(:travel_request, user: user, travel: travel) }

  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:travel) }
  end

  describe "validations" do
    it { is_expected.to define_enum_for(:status).with_values(%i[pending accepted rejected]) }
  end

  describe "callbacks" do
    it "generates an ID with prefix 'trs' before create" do
      expect(travel_request.id).to start_with("trs")
    end
  end

  describe "custom methods" do
    # Here you can test any additional custom methods for TravelRequest
  end
end
