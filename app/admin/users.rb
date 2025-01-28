ActiveAdmin.register User do
  menu priority: 2

  permit_params :email, :name, :status

  index do
    selectable_column
    id_column
    column :email
    column :name
    column :created_at
    column "Draft Teams" do |user|
      user.draft_teams.count
    end
    column "Active Draft Teams" do |user|
      user.draft_teams.where(status: 'active').count
    end
    actions
  end

  show do
    attributes_table do
      row :id
      row :email
      row :name
      row :created_at
      row :updated_at
      row :sign_in_count
      row :current_sign_in_at
      row :last_sign_in_at
    end

    panel "User's Draft Teams" do
      table_for user.draft_teams do
        column :name
        column :status
        column "Players" do |team|
          team.players.count
        end
        column :created_at
      end
    end
  end

  filter :email
  filter :name
  filter :created_at
  filter :draft_teams_name, as: :string, label: 'Draft Team Name'

  form do |f|
    f.inputs do
      f.input :email
      f.input :name
      f.input :status, as: :select, collection: ['active', 'inactive', 'suspended']
    end
    f.actions
  end

  sidebar "User Details", only: :show do
    attributes_table_for user do
      row "Total Draft Teams" do |u|
        u.draft_teams.count
      end
      row "Active Teams" do |u|
        u.draft_teams.where(status: 'active').count
      end
      row "Total Players" do |u|
        u.draft_teams.joins(:players).count
      end
    end
  end
end 