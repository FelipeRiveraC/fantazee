FactoryBot.define do
  factory :travel_evaluation do
    user
    travel
    rating { 3 } 
    comment { "Great trip!" }
  end
end