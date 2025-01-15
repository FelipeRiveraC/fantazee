# spec/models/travel_spec.rb

require 'rails_helper'

RSpec.describe Travel, type: :model do
  let(:user) { create(:user) }
  let(:travel) { create(:travel) }

  describe "associations" do
    it { is_expected.to have_many(:travels_users).dependent(:destroy) }
    it { is_expected.to have_many(:users).through(:travels_users) }
    it { is_expected.to have_many(:travel_requests).dependent(:destroy) }
  end

  describe "callbacks" do
    it "generates an ID with prefix 'trv' before create" do
      expect(travel.id).to start_with("trv")
    end
  end
end
