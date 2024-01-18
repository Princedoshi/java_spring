//CustomerRepository.java

package com.example.demo.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {

    // Custom query to search for customers based on various attributes
    @Query("SELECT c FROM Customer c WHERE LOWER(CONCAT('%', c.phone, '%')) LIKE LOWER(:searchTerm)")
    Page<Customer> searchAllAttributes(@Param("searchTerm") String searchTerm, Pageable pageable);

}
