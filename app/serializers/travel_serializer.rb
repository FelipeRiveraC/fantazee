class TravelSerializer < ActiveModel::Serializer
  attributes :id, 
             :name, 
             :description, 
             :status, 
             :updated_at, 
             :created_at, 
             :owner_email, 
             :origin, 
             :destination, 
             :distance_km, 
             :start_date, 
             :end_date, 
             :estimated_budget, 
             :currency, 
             :max_participants, 
             :current_participants, 
             :travel_type, 
             :owner_travel_evaluations, 
             :notes, 
             :is_public,
             :participants

  has_many :travel_requests
  has_many :travel_evaluations
  has_many :travel_chat_messages

  def owner_email
    owner = object.travels_users.find_by(role: :owner)
    owner ? owner.user.email : "No owner assigned"
  end

  def travel_type
    object.travel_type ? object.travel_type.humanize : nil
  end

  def is_public
    object.is_public ? "Public" : "Private"
  end

  def owner_travel_evaluations
    owner = object.travels_users.find_by(role: :owner)
    owner ? owner.user.travel_evaluations : []
  end

  def participants
    object.travel_requests.where(status: :accepted).map do |tr|
      {
        id: tr.user.id,
        name: tr.user.name,
        email: tr.user.email
      }
    end
  end

  def travel_chat_messages
    object.travel_chat_messages.map do |message|
      {
        id: message.id,
        travel_id: message.travel_id,
        sender_id: message.sender_id,
        sender_name: message.sender.name,
        content: message.content,
        created_at: message.created_at,
        updated_at: message.updated_at
      }
    end
  end
end
