class Api::V1::BaseController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :process_token

  def process_token
    token = request.headers['Authorization'].split(' ').last
    email = request.headers['Email']
    user = User.find_by(email: email)
    render_unauthorized unless user && user.token == token
  end

  def render_unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  def render_error(resource)
    render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
  end
  
  def current_user
    @current_user ||= User.find_by(email: request.headers['Email'])
  end
end
