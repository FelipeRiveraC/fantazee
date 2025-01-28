ActiveAdmin.register Player do
  permit_params :name, :api_id, :photo, :firstname, :lastname, :position, :number

  index do
    selectable_column
    id_column
    column :name
    column :firstname
    column :lastname
    column :position
    column :number
    column :nationality
    column :created_at
    actions
  end

  filter :name
  filter :firstname
  filter :lastname
  filter :position, as: :select, collection: Player::POSITIONS
  filter :nationality
  filter :created_at

  form do |f|
    f.inputs do
      f.input :name
      f.input :api_id
      f.input :photo
      f.input :firstname
      f.input :lastname
      f.input :position, as: :select, collection: Player::POSITIONS
      f.input :number
    end
    f.actions
  end
end 