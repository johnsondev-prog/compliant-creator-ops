# Data Model

## Users
- id
- email
- full_name
- role
- created_at

## Services
- id
- name
- slug
- description
- price
- category
- is_active
- created_at

## Orders
- id
- user_id
- service_id
- status
- amount
- payment_reference
- created_at

## Payments
- id
- order_id
- provider
- provider_reference
- amount
- status
- paid_at

## Admin Notes
- id
- order_id
- note
- created_by
- created_at
