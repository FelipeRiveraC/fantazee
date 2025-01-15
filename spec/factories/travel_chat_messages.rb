FactoryBot.define do
  factory :travel_chat_message do
    content { "Sample message" }
    association :sender, factory: :user
    travel
  end
end