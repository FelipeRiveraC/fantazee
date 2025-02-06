class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token
  skip_before_action :process_token, only: [:login, :create]

  def login
    user = User.find_by(email: login_params[:email])
    if user && user.valid_password?(login_params[:password])
      render json: { user: user, token: user.generate_token }
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { user: user, token: user.generate_token }
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: { user: serialize_user(user) }
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  private

  def serialize_user(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    }
  end

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

  def login_params
    params.permit(:email, :password)
  end
end