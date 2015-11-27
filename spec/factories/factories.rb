# FactoryGirl.define do
# 	sequence :email do |n|
# 		"person#{n}@example.com"
# 	end
# end

FactoryGirl.define do
#sequence(:email) { |n| "person#{n}@example.com" }
	factory :user do
		email 'juanbausa@gmail.com'
		password '123456789'
		#password_confirmation '123456789'
	end
end