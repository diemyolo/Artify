package com.example.artworksharingplatform.entity;

import java.util.Date;
import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Table(name = "Transactions")
@Data
public class Transaction {

	@Id
	@UuidGenerator
	private UUID id;

	@Column(name = "TotalMoney")
	private float totalMoney;

	@Temporal(TemporalType.DATE)
	@Column(name = "TransactionDate")
	private Date transactionDate;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@OneToOne
	@JoinColumn(name = "money_input_id",referencedColumnName = "id")
	private MoneyInput moneyInput;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "OrderID", referencedColumnName = "id")
	private Order order;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "PreOrderID", referencedColumnName = "id")
	private PreOrder preOrder;
}
