class Player < ApplicationRecord
  has_many :player_statistics, dependent: :destroy
  has_many :matches, through: :player_statistics
  has_many :players_draft_teams, dependent: :destroy
  has_many :draft_teams, through: :players_draft_teams


  private

  def generate_id
    init_id('pla')
  end
end

# == Schema Information
#
# Table name: players
#
#  id         :string           not null, primary key
#  api_id     :integer          not null
#  name       :string           not null
#  photo_url  :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_players_on_api_id  (api_id) UNIQUE
#
