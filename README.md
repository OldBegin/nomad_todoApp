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

11/28 집
## App-function: App의 TextInput으로 text를 추가하면 투두가 리스트에 추가됨. - (본앱의 주 기능)

1. 로딩중에 나타날 화면을 만들어 로딩중엔 로딩컴퍼넌트를 보여주고 로딩이 완료되면 메인컴퍼넌트를 보여주는 기능

  // 컴퍼넌트가 준비되면 호출되는 라이프사이클 미들웨어
  - componentDidMount = () => {
      this._loadTodos();
    };

  // state를 변경하여 메인 로딩페이지를 랜더링
  - _loadTodos = () => {
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

  /* todo컴퍼넌트에 넘겨줄 프롭스덩어리를 만들기위해 오브젝트(newTodoObject)를 생성해서 
  기존의 state인 prevState(예약어가 아닌 setState 내부의 함수의 첫번째 파라메타로 전달되는 사용자지정인수명) 
  에 추가로 덧붙이는 작업.

  newState { //이전스테이트에 추가할 스테이트자료를 더해 최신 스테이트를 만듬
    ...prevState // 이전스테이트
    newTodo='' // 오브젝트덩어리에 이미 내용을 넣었으므로 비움,
    todos{ 
      ... prevState.todos, //이전스테이트의 오브젝트덩어리
      newTodoObject, //  현재만들어진오브젝트덩어리인
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