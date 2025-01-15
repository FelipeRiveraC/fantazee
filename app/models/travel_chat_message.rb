class TravelChatMessage < ApplicationRecord
  belongs_to :travel
  belongs_to :sender, class_name: 'User'

  validates :content, presence: true

  before_create :generate_id

  private

  def generate_id
    init_id('tcm')
  end
end

# == Schema Information
#
# Table name: travel_chat_messages
#
#  id         :string           not null, primary key
#  travel_id  :string           not null
#  sender_id  :string           not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_travel_chat_messages_on_sender_id  (sender_id)
#  index_travel_chat_messages_on_travel_id  (travel_id)
#
# Foreign Keys
#
#  fk_rails_...  (sender_id => users.id)
#  fk_rails_...  (travel_id => travels.id)
#
