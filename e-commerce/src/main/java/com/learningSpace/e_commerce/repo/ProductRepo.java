package com.learningSpace.e_commerce.repo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.learningSpace.e_commerce.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {

    @Query("SELECT p from Product p Where "+
        "LOWER(p.name) LIKE LOWER(CONCAT('%',:keyword,'%')) OR " +
        "LOWER(p.desc) LIKE LOWER(CONCAT('%',:keyword,'%')) OR " +
        "LOWER(p.brand) LIKE LOWER(CONCAT('%',:keyword,'%')) OR " +
        "LOWER(p.category) LIKE LOWER(CONCAT('%',:keyword,'%')) " 
        )
    List<Product> searchProducts(String keyword);
    

}
