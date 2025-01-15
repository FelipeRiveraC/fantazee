class Match < ApplicationRecord
  has_many :player_statistics, dependent: :destroy
  has_many :players, through: :player_statistics

  private

  def generate_id
    init_id('mat')
  end
end
