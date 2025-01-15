class Travel < ApplicationRecord
  has_many :travels_users, dependent: :destroy
  has_many :users, through: :travels_users
  has_many :travel_requests, dependent: :destroy
  has_many :travel_evaluations, dependent: :destroy
  has_many :travel_chat_messages, dependent: :destroy

  before_create :generate_id

  enum status: { active: 0, archived: 1, rejected: 3 }, _prefix: :status
  enum travel_type: { business: 0, leisure: 1, adventure: 2, cultural: 3 }, _prefix: :travel_type

  validates :name, :description, :start_date, :end_date, :max_participants, presence: true
  validates :estimated_budget, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :distance_km, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true
  validates :max_participants, numericality: { only_integer: true, greater_than: 0 }
  validates :current_participants, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  private

  def generate_id
    init_id('trv')
  end
end


# == Schema Information
#
# Table name: travels
#
#  id                                                      :string           not null, primary key
#  name                                                    :string
#  description                                             :string
#  status                                                  :integer
#  created_at                                              :datetime         not null
#  updated_at                                              :datetime         not null
#  origin(Origin of the travel)                            :string
#  destination(Destination of the travel)                  :string
#  distance_km(Estimated distance in kilometers)           :decimal(10, 2)
#  start_date(Start date and time of the travel)           :datetime
#  end_date(End date and time of the travel)               :datetime
#  estimated_budget(Estimated budget for the travel)       :decimal(15, 2)
#  currency(Currency for the budget)                       :string
#  max_participants(Maximum number of participants)        :integer
#  current_participants(Current number of participants)    :integer          default(0)
#  travel_type(Type of travel (e.g., business, leisure))   :integer
#  notes(Additional notes about the travel)                :text
#  is_public(Indicates if the travel is public or private) :boolean          default(FALSE)
#
