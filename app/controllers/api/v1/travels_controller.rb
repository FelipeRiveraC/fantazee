class Api::V1::TravelsController < Api::V1::BaseController
  before_action :travel, only: [:update, :destroy, :create_request]

  def show
    render json: { travel: TravelSerializer.new(travel) }
  end

  def index
    travels = if params["all"].present? && params["all"] == "true"
                Travel.all
              elsif params["requested"].present? && params["requested"] == "true"
                Travel.joins(:travel_requests).where(travel_requests: { user_id: current_user.id })
              elsif params["accepted"].present? && params["accepted"] == "true"
                Travel.joins(:travel_requests).where(travel_requests: { user_id: current_user.id, status: 'accepted' })
              else
                current_user.travels
              end

    if params[:start_date].present?
      travels = travels.where('DATE(start_date) >= ?', params[:start_date])
    end

    render json: { travels: ActiveModelSerializers::SerializableResource.new(travels, each_serializer: TravelSerializer) }
  end

  def create
    travel = Travel.new(travel_params.merge(status: :active))
  
    if travel.save
      travel_user = TravelsUser.new(user: current_user, travel: travel, role: :owner)
      if travel_user.save
        render json: { travel: TravelSerializer.new(travel) }, status: :created
      else
        render json: { errors: travel_user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: travel.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  def create_request
    travel_request = TravelRequest.new(travel_request_params.merge(user: current_user, travel: travel))
    if travel_request.save
      render json: { travel_request: travel_request }, status: :created
    else
      render json: { errors: travel_request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_request
    if travel_request.update(travel_request_params)
      render json: { travel_request: travel_request }, status: :ok
    else
      render json: { errors: travel_request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if travel.update(travel_params)
      render json: { travel: TravelSerializer.new(travel) }, status: :ok
    else
      render json: { errors: travel.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if travel.destroy
      render json: { message: 'Travel deleted successfully' }
    else
      render json: { errors: travel.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def travel_request
    @travel_request ||= TravelRequest.find(params[:travel_request_id])
  end

  def travel_request_params
    params.require(:travel_request).permit(:message, :status)
  end

  def travel
    @travel ||= Travel.find(params[:id])
  end

  def travel_params
    params.require(:travel).permit(
      :name,
      :description,
      :status,
      :origin,
      :destination,
      :distance_km,
      :start_date,
      :end_date,
      :estimated_budget,
      :currency,
      :max_participants,
      :travel_type,
      :notes,
      :is_public
    )
  end
  
end
