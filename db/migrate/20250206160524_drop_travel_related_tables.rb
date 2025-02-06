class DropTravelRelatedTables < ActiveRecord::Migration[7.0]
  def up
    # First drop tables with foreign keys to avoid constraint issues
    drop_table :travels_users if table_exists?(:travels_users)
    drop_table :travel_requests if table_exists?(:travel_requests)
    drop_table :travel_evaluations if table_exists?(:travel_evaluations)
    drop_table :travel_chat_messages if table_exists?(:travel_chat_messages)
    
    # Then drop the main tables
    drop_table :travels if table_exists?(:travels)
    drop_table :engagements if table_exists?(:engagements)

    # Drop the enum type if it exists
    execute "DROP TYPE IF EXISTS engagement_status"
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
