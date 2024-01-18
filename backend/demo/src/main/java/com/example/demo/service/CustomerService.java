//CustomerService.java

package com.example.demo.service;

import com.example.demo.dao.CustomerRepository;
import com.example.demo.entity.Customer;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CustomerService {

    @Autowired
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer createCustomer(Customer customer) {
        // Basic logic for creating a customer
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(String customerId, Customer customer) {
        // Basic logic for updating a customer
        Customer existingCustomer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + customerId));

        existingCustomer.setFirstName(customer.getFirstName());
        existingCustomer.setLastName(customer.getLastName());
        existingCustomer.setStreet(customer.getStreet());
        existingCustomer.setAddress(customer.getAddress());
        existingCustomer.setCity(customer.getCity());
        existingCustomer.setState(customer.getState());
        existingCustomer.setEmail(customer.getEmail());
        existingCustomer.setPhone(customer.getPhone());

        return customerRepository.save(existingCustomer);
    }

    public Page<Customer> getCustomers(Pageable pageable, String searchTerm) {
        // Basic logic for fetching customers with pagination, sorting, and searching
        if (searchTerm != null && !searchTerm.isEmpty()) {
            return customerRepository.searchAllAttributes(searchTerm, pageable);
        } else {
            return customerRepository.findAll(pageable);
        }
    }

    public Customer getCustomerById(String customerId) {
        // Basic logic for fetching a customer by ID
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + customerId));
    }

    public void deleteCustomer(String customerId) {
        // Basic logic for deleting a customer
        Customer existingCustomer = customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + customerId));

        customerRepository.delete(existingCustomer);
    }
}
