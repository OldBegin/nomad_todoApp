# Nomad_TodoApp
유투버 nomed의 리엑트네이티브로 투두앱 만들기 - Build To Do App with React Native
11/21 집
StatusBar:
main View: Style
Card View: Style
TextInput: Style function: 일부

11/22 집
Todo-function: 토글하여 circle 및 텍스트 스타일 변경하기(Circle borderColor, textDecorationLine: 'line-through') / onPress 이벤트 핸들러(_onToggleComplete) 생성
Todo-style: Action 버튼 스타일 코딩중

11/23 집
Todo-style: Action 버튼 2종(편집,삭제) 스타일 코딩완료
Todo-function: 편집✏️버튼과 체크 ✅버튼 토글기능 코딩완료 / onPress 이벤트 핸들러 2종( _onStartEdiging, _onFinishEditing) 생성

### 11/28 집
### App-function: App의 TextInput으로 text를 추가하면 투두가 리스트에 추가됨. - (본앱의 주 기능)

1. 로딩중에 나타날 화면을 만들어 로딩중엔 로딩컴퍼넌트를 보여주고 로딩이 완료되면 메인컴퍼넌트를 보여주는 기능

  // 컴퍼넌트가 준비되면 호출되는 라이프사이클 미들웨어
  
   componentDidMount = () => {
      this._loadTodos();
    };

  // state를 변경하여 메인 로딩페이지를 랜더링
   _loadTodos = () => {
      this.setState({loadedTodos: true});
    };

2. 고유아이디를 자동으로 생성하는 패키지 추가
 - npm install uuid --save //add package from npm
 - import uuidv1 from 'uuid/v1'; // import in TodoApp
 - const ID = uuidvi() // 추출
 - const _object = { // 사용
    [ID]: {
      id: ID,
      name: name,
      tel: tel
    }
  }

3. TextInput 으로 작성한 내용을 리스트에 추가

```js
  /* todo컴퍼넌트에 넘겨줄 프롭스덩어리를 만들기위해 오브젝트(newTodoObject)를 생성해서 
  기존의 state인 prevState(예약어가 아닌 setState 내부의 함수의 첫번째 파라메타로 전달되는 사용자지정인수명) 
  에 추가로 덧붙이는 작업. */

  newState {               // 이전스테이트에 추가할 스테이트자료를 더해 최신 스테이트를 만듬
    ...prevState           // 이전스테이트
    newTodo=''             // 오브젝트덩어리에 이미 내용을 넣었으므로 비움,
    todos{ 
      ... prevState.todos, // 이전스테이트의 오브젝트덩어리
      newTodoObject,       // 현재만들어진오브젝트덩어리인
    })
  }
  */

  //_addTodo 메소드 전체코드

  _addTodo = () => {
      const {newTodo} = this.state;
      if (newTodo !== '') {
        this.setState(prevState => {
          const ID = uuidv1();
          const newToDoObject = {
            [ID]: {
              id: ID,
              isComleted: false,
              text: newTodo,
              createdAt: Date.now(),
            },
          };
          const newState = {
            ...prevState,
            newTodo: '',
            toDos: {
              ...prevState.toDos,
              ...newToDoObject,
            },
          };
          return {...newState};
        });
      }
    };
    // 만들어진 오브젝트를 랜더링

    {Object.values(toDos).map(todo => ( <Todo key={toDos.id} {...todo} /> )
```

11/29 회사

## App-fuction: _deleteTodo in App , coded function _changeUncomplete, function _changeComplete in App 

### _deleteTodo 메소드는 Todo comp 의 x OnPress 이벤트 핸들러임 
### Todo Component 는 App Component로부터 props로 넘겨받아 가지고있던 id값을 이 핸들러에 넘겨주고
### 핸들러는 App의 state를 변경하여 해당 컴퍼넌트를 삭제하여 랜더링항.

```js
  _deleteTodo = id => {              // Todo Component로부터 id값을 인수로 넘겨받음.
    this.setState(prevState => {     // 기존의 state값을 prevState인수로 가져움
      const toDos = prevState.toDos; // 기존의 toDos값을 받아옴
      delete toDos[id];              // 받아온 toDos중 인수로넘겨받은 id값을 가진 오브젝트 덩어리를 삭제함.
      const newState = {             // 새로운스테이트를 저장할 변수를 생성하여
        ...prevState,                // 우선 기존스테이트를 나열하고
        ...toDos,                    // 삭제완료된 toDos 객체를 추가로 나열하여 저장하고
      };
      return {
        ...newState,                 // 저장된 스테이트를 나열하여 리턴
      };
    });
  };
```
## _changeComplete 와 _changeUncomplete 는 Todo comp 의 circle부분의 Onpress 이벤트의 핸들러이다.
## onPress 이벤트는 우선 Todo component 내부의 메소드인  _onToggleComplete 를 호출하고
## 두 메소드는 _onToggleComplete 함수 본체내부에서 if문 분기를 통해 각 핸들러가 호출된다.
## 핸들러를 호출한 Todo Component 는 자신의 id 값을 인수로 전달하며, 핸들러는 App Component의 state 내의
## toDos객체배열중이 id 해당하는 isComplete 값을 변경하여 랜더링한다.
```js
  _changeUncomplete = id => {          // Todo Component로부터 id값을 받아오고
    this.setState(prevState => {       // App Component의 기존 State값을 prevState인수로 받아와서
      const newState = {               // 갱신된 오브젝트를 저장할 변수를 newState로 선언하고
        ...prevState,                  // 우선 이전 스테이트를 나열하고
        toDos: {                       // toDos객체배열을 열어제껴서
          ...prevState.toDos,          // 나머지것들은 기존 state를 나열하고
          [id]: {                      // 객체배열중 인수로 넘어온 id와 동일한 객체를 열어제껴서
            ...prevState.toDos[id],    // 이또한 id와 해당되는 기존stste를 가져와 나열하고
            isCompleted: false,        // iscompleted 만 false로 변경한다.

      };
      return {
        ...newState,
      };
    });
  };
  _changeComplete = id => {
    console.log('here is Complete');
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true,
          },
        },
      };
      return {
        ...newState,
      };
    });
  };
  ```

### 투두내용을 수정해서 적용했을때 업데이트하는 핸들러
  ```js
   _todoUpdate = (id, updatedText) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: updatedText,
          },
        },
      };
      return {...newState};
    });
  };
  ```

  ### 14. states 내용을 디스크에 저장하기
  11/29-집

  #### 강좌에서 사용하는 리엑트네이티브 내장 스토리지는 추후 제거될것이므로 아래 링크를 참조하여 async-storage 패키지를 인스톨함
  https://github.com/react-native-community/async-storage

  ```js
  패키지설치
  npm add @react-native-community/async-storage --save

  링크
  npm add react-native-webview
  cd ios && pod install && cd .. # CocoaPods on iOS needs this extra step

  ```
#### 사용 
  ```js
    // Store data: state 의 toDos 오브젝트를 스트링으로 형변환하여 디스크에 저장 //
  _saveTodos = async newTodos => {
    try {
      console.log('saveTodos: ', this.state.loadedTodos);
      await AsyncStorage.setItem('toDos', JSON.stringify(newTodos));
    } catch (e) {
      console.log(e);
    }
  };

  // Read data: 디스크에 저장된 스트링형태의 toDos를 오브젝트로 파싱하여 setState
  _loadTodos = async () => {
    try {
      const value = await AsyncStorage.getItem('toDos');
      if (value !== null) {
        const parsedTodos = JSON.parse(value);
        this.setState({loadedTodos: true, toDos: parsedTodos});
      }
    } catch (err) {
      console.log(err);
    }
  };
  ```

