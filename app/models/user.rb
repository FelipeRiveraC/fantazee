class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :travels_users, dependent: :destroy
  has_many :travels, through: :travels_users
  has_many :travel_evaluations, dependent: :destroy, through: :travels

  has_many :draft_teams, dependent: :destroy

  def self.ransackable_attributes(auth_object = nil)
    ["id", "name", "email", "created_at", "updated_at", "token"]
  end

  def self.ransackable_associations(auth_object = nil)
    ["draft_teams", "travels", "travels_users", "travel_evaluations"]
  end

  def generate_token
    token = Devise.friendly_token
    update!(token: token)
    token
  end

  private

  def generate_id
    self.id = init_id('usr')
  end
end

# == Schema Information
#
# Table name: users
#
#  id                     :string           not null, primary key
#  name                   :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  token                  :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
