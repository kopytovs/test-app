import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


var myTab = [{
  id: 1,
  first_name: "Jeanette",
  last_name: "Penddreth",
  email: "jpenddreth0@census.gov",
  gender: "Female",
  ip_address: "26.58.193.2"
}, {
  id: 2,
  first_name: "Giavani",
  last_name: "Frediani",
  email: "gfrediani1@senate.gov",
  gender: "Male",
  ip_address: "229.179.4.212"
}, {
  id: 3,
  first_name: "Noell",
  last_name: "Bea",
  email: "nbea2@imageshack.us",
  gender: "Female",
  ip_address: "180.66.162.255"
}, {
  id: 4,
  first_name: "Willard",
  last_name: "Valek",
  email: "wvalek3@vk.com",
  gender: "Male",
  ip_address: "67.76.188.26"
}]

const myColumns = [{
	Header: 'Фамилия',
	accessor: 'last_name',
	width: 100
}, {
	Header: 'Имя',
	accessor: 'first_name',
	width: 100
},{
	Header: 'Электронный адрес',
	accessor: 'email',
	width: 180
},{
	Header: 'Пол',
	accessor: 'gender',
	width: 70
},{
	Header: 'Адрес ip',
	accessor: 'ip_address',
	width: 130
}]

class App extends React.Component{
	
	render(){
		return(
		<div>
		<h1>Тестовое приложение</h1>
		<Menu items={['База данных', 'Добавление']} />
		</div>
		)
	}
}

class Menu extends React.Component{
	
  constructor(){
	  super()
	  this.state = {
		  focused: 0
	  };

		this.addNewUser = this.addNewUser.bind(this);
  }
	
  /*getInitialState(){
    return { focused: 0 };
  }*/
  
  clicked(index){
    this.setState({focused: index});
  }

	addNewUser(newData){
		//debugger
		myTab.push(newData);

    this.setState({focused: 0});
	}
  
  render() {
    var self = this;
    return (
       <div>
          <ul>{ this.props.items.map(function(m, index){
             var style = '';
             if(self.state.focused===index){style = 'focused'}
        
             return <li className={style}
                        key={index}
                        onClick={self.clicked.bind(self, index)}>{m}</li>;
             }) }
          </ul>
          {this.props.items[this.state.focused] === 'База данных' ? <ReactTable data={myTab} columns={myColumns} /> : <AddDatas addNewUser={this.addNewUser} />}

       </div>
    )
  }
}

class AddDatas extends React.Component{
	
	constructor(){
		super()
		this.firstName = '';
		this.lastName = '';
		this.email = '';
		this.gender = 'Male';
		this.ip_address = '';

		this.state = {
			errorData: {
				errorFirstName: false,
				errorLastName: false,
				errorEmail: false,
				errorIP: false
			}
		};
			
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(){
		const info = {
			id: myTab.length+1,
			first_name: this.firstName.value,
			last_name: this.lastName.value,
			email: this.email.value,
			gender: this.gender.value,
			ip_address: this.ip_address.value
		},
		errorData = {
			errorFirstName: false,
			errorLastName: false,
			errorEmail: false,
			errorIP: false
		},
		emailRegex = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
		nameRegex = /^[а-яА-ЯёЁa-zA-Z]+$/,
		ipRegex = /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)/;

		if ((info.first_name.length < 2) || (info.first_name > 20) || (!nameRegex.test(info.first_name))){
			errorData.errorFirstName = true;
		}
		if ((info.last_name.length) < 2 || (info.last_name > 20) || (!nameRegex.test(info.last_name))){
			errorData.errorLastName = true;
		}
		if (!emailRegex.test(info.email)){
			errorData.errorEmail = true;
		}
		if (!ipRegex.test(info.ip_address)){
			errorData.errorIP = true;
		}

		if (!errorData.errorFirstName && !errorData.errorLastName && !errorData.errorEmail && !errorData.errorIP){
			this.props.addNewUser(info);
		} else{
			this.setState({errorData : errorData});
		}

	}
	
	render(){
		const { errorFirstName, errorLastName, errorEmail, errorIP} = this.state.errorData;

		return(
			<div>
				<fieldset>
					<br />
					<input 
						type="text" 
						ref={el => this.firstName = el}
						className={errorFirstName ? 'error-input' : null}
						placeholder="Введите имя" 
					/>
					<input 
						type="text" 
						ref={el => this.lastName = el}
						className={errorLastName ? 'error-input' : null}
						placeholder="Введите фамилию" 
					/>
					<br />
					<select ref={el => this.gender = el}>
						<option>Male</option>
						<option>Female</option>
					</select>
					<br />
					<input 
						type="email" 
						ref={el => this.email = el}
						className={errorEmail ? 'error-input' : null}
						placeholder="Введите почту" 
					/>
					
					<input
						type="text"
						ref={el => this.ip_address = el}
						className={errorIP ? 'error-input' : null}
						placeholder="Введите IP адрес"
					/>
					<br />
					<br />
					<button className='nice-button' onClick={this.handleSubmit}> Добавить </button>
					<br />
					<br />
				</fieldset>
			</div>
		)
	}
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



