require 'rails_helper'

RSpec.describe Api::V1::TravelChatsController, type: :request do
  let(:user) { create(:user, email: 'user@example.com', password: 'password123', token: 'valid_token') }
  let(:auth_headers) do
    {
      "Authorization" => "Bearer #{user.token}",
      "Email" => user.email
    }
  end
  let(:travel) { create(:travel) }
  let!(:travel_chat_message) { create(:travel_chat_message, travel: travel, sender: user) }

  before do
    travel.travels_users.create(user: user, role: :owner)
    allow_any_instance_of(Api::V1::BaseController).to receive(:current_user).and_return(user)
  end

  def json
    JSON.parse(response.body)
  end

  describe "GET /api/v1/travels/:travel_id/travel_chats" do
    it "returns a list of all chat messages for a travel" do
      get "/api/v1/travels/#{travel.id}/travel_chats", headers: auth_headers
      expect(response).to have_http_status(:ok)
      expect(json['messages'].length).to eq(1)
    end
  end

  describe "POST /api/v1/travels/:travel_id/travel_chats" do
    context "with valid attributes" do
      it "creates a new message" do
        message_params = { content: "New message content" }
        post "/api/v1/travels/#{travel.id}/travel_chats", params: { travel_chat_message: message_params }, headers: auth_headers
        expect(response).to have_http_status(:created)
        expect(json['message']['content']).to eq("New message content")
      end
    end

    context "with invalid attributes" do
      it "returns errors" do
        message_params = { content: "" } # Assuming empty content is invalid
        post "/api/v1/travels/#{travel.id}/travel_chats", params: { travel_chat_message: message_params }, headers: auth_headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(json['errors']).not_to be_empty
      end
    end
  end
end