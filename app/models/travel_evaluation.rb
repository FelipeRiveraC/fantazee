class TravelEvaluation < ApplicationRecord
  belongs_to :user
  belongs_to :travel

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :comment, length: { maximum: 500 }
  validates :user_id, uniqueness: { scope: :travel_id, message: "ya ha evaluado este viaje" }

  validate :user_must_have_accepted_request

  private

  def user_must_have_accepted_request
    unless TravelRequest.exists?(user: user, travel: travel, status: :accepted)
      errors.add(:user, "no tiene permitido evaluar este viaje")
    end
  end

  def generate_id
    init_id('tee')
  end
end

# == Schema Information
#
# Table name: travel_evaluations
#
#  id         :string           not null, primary key
#  user_id    :string           not null
#  travel_id  :string           not null
#  rating     :integer          not null
#  comment    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_travel_evaluations_on_travel_id  (travel_id)
#  index_travel_evaluations_on_user_id    (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (travel_id => travels.id)
#  fk_rails_...  (user_id => users.id)
#
