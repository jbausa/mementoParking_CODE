# FactoryGirl.define do
# 	sequence :email do |n|
# 		"person#{n}@example.com"
# 	end
# end

FactoryGirl.define do
	factory :user do
		#sequence(:email) { |n| "person#{n}@example.com" }
		email 'JohnDoe@email.com'
		password '123456789'
		#password_confirmation '123456789'
	end
end