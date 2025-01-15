class TravelsUser < ApplicationRecord
  belongs_to :travel
  belongs_to :user

  enum role: { owner: 0, participant: 1 }, _prefix: :role


  private

  def generate_id
    init_id('tru')
  end
end

# == Schema Information
#
# Table name: travels_users
#
#  id         :string           not null, primary key
#  travel_id  :string           not null
#  user_id    :string           not null
#  role       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_travels_users_on_travel_id  (travel_id)
#  index_travels_users_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (travel_id => travels.id)
#  fk_rails_...  (user_id => users.id)
#
