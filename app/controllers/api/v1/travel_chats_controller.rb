class Api::V1::TravelChatsController < Api::V1::BaseController
  before_action :find_travel

  def index
    messages = @travel.travel_chat_messages.order(created_at: :asc)
    render json: { messages: messages.map { |m| serialize_message(m) } }
  end

  def create
    message = @travel.travel_chat_messages.new(message_params.merge(sender: current_user))
    if message.save
      render json: { message: serialize_message(message) }, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def find_travel
    @travel = Travel.find(params[:travel_id])
  end

  def message_params
    params.require(:travel_chat_message).permit(:content)
  end

  def serialize_message(message)
    {
      id: message.id,
      content: message.content,
      sender_id: message.sender_id,
      sender_name: message.sender.name,
      created_at: message.created_at
    }
  end
end
