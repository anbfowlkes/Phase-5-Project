class CreateDeveloperProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :developer_profiles do |t|
      t.string :charttype
      t.string :xaxis
      t.string :yaxis

      t.timestamps
    end
  end
end
