class Api::V1::TravelEvaluationsController < Api::V1::BaseController
  before_action :find_travel, only: [:create, :index]
  before_action :find_evaluation, only: [:update, :destroy]

  def index
    evaluations = @travel.travel_evaluations.includes(:user)
    render json: { evaluations: evaluations.map { |e| serialize_evaluation(e) } }
  end

  def create
    evaluation = @travel.travel_evaluations.new(evaluation_params.merge(user: current_user))
    if evaluation.save
      render json: { evaluation: serialize_evaluation(evaluation) }, status: :created
    else
      render json: { errors: evaluation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @evaluation.update(evaluation_params)
      render json: { evaluation: serialize_evaluation(@evaluation) }, status: :ok
    else
      render json: { errors: @evaluation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @evaluation.destroy
      render json: { message: 'Evaluación eliminada correctamente' }, status: :ok
    else
      render json: { errors: @evaluation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def find_travel
    @travel = Travel.find(params[:travel_id])
  end

  def find_evaluation
    @evaluation = TravelEvaluation.find(params[:id])
  end

  def evaluation_params
    params.require(:travel_evaluation).permit(:rating, :comment)
  end

  def serialize_evaluation(evaluation)
    {
      id: evaluation.id,
      user_name: evaluation.user.name,
      rating: evaluation.rating,
      comment: evaluation.comment,
      created_at: evaluation.created_at,
      user_id: evaluation.user.id
    }
  end
end
