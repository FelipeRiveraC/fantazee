class TravelRequest < ApplicationRecord
  belongs_to :user
  belongs_to :travel

  enum status: { pending: 0, accepted: 1, rejected: 2 }


  private

  def generate_id
    init_id('trs')
  end
end

# == Schema Information
#
# Table name: travel_requests
#
#  id         :string           not null, primary key
#  user_id    :string           not null
#  travel_id  :string           not null
#  status     :integer          default("pending")
#  message    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_travel_requests_on_travel_id  (travel_id)
#  index_travel_requests_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (travel_id => travels.id)
#  fk_rails_...  (user_id => users.id)
#
