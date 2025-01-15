# spec/factories/travels.rb
FactoryBot.define do
  factory :travel do
    name { "Sample Travel" }
    description { "A description of the travel" }
    start_date { Date.today }
    end_date { Date.today + 7.days }
    max_participants { 10 }
    # Add any other required attributes here
  end
end