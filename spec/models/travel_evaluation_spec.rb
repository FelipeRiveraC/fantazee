require 'rails_helper'

RSpec.describe TravelEvaluation, type: :model do
  let(:user) { create(:user) }
  let(:travel) { create(:travel) }
  let!(:travel_request) { create(:travel_request, user: user, travel: travel, status: :accepted) }
  let(:travel_evaluation) { build(:travel_evaluation, user: user, travel: travel) }


  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(travel_evaluation).to be_valid
    end

    it 'is not valid without a rating' do
      travel_evaluation.rating = nil
      expect(travel_evaluation).not_to be_valid
    end

    it 'is valid without a comment' do
      travel_evaluation.comment = nil
      expect(travel_evaluation).to be_valid
    end

    it 'is not valid with a rating outside 1 to 5' do
      travel_evaluation.rating = 6
      expect(travel_evaluation).not_to be_valid
    end

    it 'is not valid if the user has not accepted the travel request' do
      allow(TravelRequest).to receive(:exists?).and_return(false)
      expect(travel_evaluation).not_to be_valid
    end
  end

  describe 'associations' do
    it { should belong_to(:travel) }
    it { should belong_to(:user) }
  end
end