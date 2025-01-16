class DraftTeam < ApplicationRecord
  belongs_to :user
  has_many :players_draft_teams, dependent: :destroy
  has_many :players, through: :players_draft_teams

  private

  def generate_id
    init_id('drt')
  end
end

# == Schema Information
#
# Table name: draft_teams
#
#  id         :string           not null, primary key
#  user_id    :string           not null
#  name       :string           not null
#  league     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_draft_teams_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
