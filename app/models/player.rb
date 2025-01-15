class Player < ApplicationRecord
  has_many :player_statistics, dependent: :destroy
  has_many :matches, through: :player_statistics


  private

  def generate_id
    init_id('pla')
  end
end
