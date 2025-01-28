ActiveAdmin.register Player do
  permit_params :name, :position, :team, :status

  index do
    selectable_column
    id_column
    column :name
    column :position
    column :team
    column :status
    column :created_at
    actions
  end

  filter :name
  filter :position
  filter :team
  filter :status
  filter :created_at

  form do |f|
    f.inputs do
      f.input :name
      f.input :position
      f.input :team
      f.input :status
    end
    f.actions
  end
end 