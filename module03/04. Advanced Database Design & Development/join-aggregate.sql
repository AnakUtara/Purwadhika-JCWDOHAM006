-- Contoh penggunaan join

-- Fokus pada JOIN untuk menggabungkan data dari beberapa tabel
-- Perhatikan di mana foreign key berada sebelum melakukan JOIN
-- Pemakaian spasi a, b, c setelah nama table atau column disebut alias tabel agar query lebih singkat dan mudah dibaca

select * from address a join city c on a.city_id = c.city_id join country c2 on c.country_id = c2.country_id; 

select count(f.title) film_count, a.first_name, a.last_name from film f join film_actor fa on f.film_id = fa.film_id join actor a on fa.actor_id = a.actor_id group by a.first_name, a.last_name;

select f.title, f.description, f.release_year from film f; 

select * from address a left join city c on a.city_id = c.city_id;

select * from "language" l cross join film f where l.language_id = f.language_id;

-- Aggregate functions

-- Contoh group by dengan aggregate function count & sum

select c."name", count(f.film_id) film_count from film f join film_category fc on fc.film_id = f.film_id join category c on fc.category_id = c.category_id group by c."name";

select c.customer_id, c.first_name, c.last_name, sum(p.amount) total_revenue from customer c join payment p on p.customer_id = c.customer_id join staff s on s.staff_id = p.staff_id group by c.customer_id order by total_revenue desc;

-- Contoh penggunaan aggregate function lainnya

select AVG(f.length) avg_length from film f; 

select MIN(f.length) min_length from film f;

select MAX(f.length) max_length from film f;