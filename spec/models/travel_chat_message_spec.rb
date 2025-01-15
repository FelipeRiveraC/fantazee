require 'rails_helper'

RSpec.describe TravelChatMessage, type: :model do
  let(:user) { create(:user) }
  let(:travel) { create(:travel) }
  let(:travel_chat_message) { build(:travel_chat_message, travel: travel, sender: user) }

  describe "validations" do
    it "is valid with valid attributes" do
      expect(travel_chat_message).to be_valid
    end

    it "is not valid without content" do
      travel_chat_message.content = nil
      expect(travel_chat_message).not_to be_valid
      expect(travel_chat_message.errors[:content]).to include("can't be blank")
    end

    it "is not valid without a travel" do
      travel_chat_message.travel = nil
      expect(travel_chat_message).not_to be_valid
      expect(travel_chat_message.errors[:travel]).to include("must exist")
    end

    it "is not valid without a sender" do
      travel_chat_message.sender = nil
      expect(travel_chat_message).not_to be_valid
      expect(travel_chat_message.errors[:sender]).to include("must exist")
    end
  end

  describe "callbacks" do
    it "generates an id before creation" do
      expect(travel_chat_message.id).to be_nil
      travel_chat_message.save
      expect(travel_chat_message.id).to start_with('tcm')
    end
  end
end