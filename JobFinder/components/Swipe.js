import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Animated, 
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager 
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25*SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends React.Component 
{
    // If props which is passed to this class based component doesn't have the properties which are defined in defaultProps then props
    // will take it from here so that we don't get any error message that this particular property is not defiend.
    static defaultProps = 
    {
        onSwipeRight: () => {},
        onSwipeLeft: () => {},
        keyProp: 'id'
    };
    
    constructor(props)
	{
		super(props);

		const position = new Animated.ValueXY(0, 0);

		const panResponder = PanResponder.create(
		{
			// Anytime user places their fingure on this card and starts to drag out on the screen, hey I want this penResponder to be
			// responsible for handling that gesture if we return true and if we don't want then return false
			onStartShouldSetPanResponder: () => true,

			// onPanResponderMove is callback and is called anytime when the user drags their fingure on the screen. 'gesture' will give you all
			// the infornmation what user is doing with his/her fingure on the screen like what portion ( pixels ) of the screen is touched or
			// how quickly user is moving the fingure on the screen . It is called many and many times whenever user drags. 

			// 'dx' and 'dy' are the total distances that the user has moved in a single gesture ( dragging the card either side ). 'moveX' and
			// 'moveY' is where the user touched the screen to move the card. 'vx' and 'vy' is the speed of moving the card.
			onPanResponderMove: (event, gesture) => 
			{
				position.setValue({ x: gesture.dx, y: gesture.dy });
			},

            onPanResponderRelease: (event, gesture) => 
            {
                if(gesture.dx > SWIPE_THRESHOLD)
                {
                    this.forceSwipe("right");
                }
                else  if(gesture.dx < -SWIPE_THRESHOLD)
                {
                    this.forceSwipe("left")
                }
                else
                {
                    this.resetPosition();
                }
            }
		});

        this.state = 
        { 
            panResponder, 
            position, 
            index: 0 
        };
    }
    
    // UNSAFE_componentWillReceiveProps() is invoked before a mounted component receives new props.f you need to update the state in response 
    // to prop changes, you may compare this.props and nextProps and perform state transitions using this.setState() in this method.
    UNSAFE_componentWillReceiveProps(nextProps)
    {
        if(nextProps.data !== this.props.data)
        {
            this.setState({ index: 0 });
        }
    }

    UNSAFE_componentWillUpdate()
    {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe = direction =>
    {
        let moveDirection = SCREEN_WIDTH;

        if(direction=='left')
        moveDirection*=-1;

        // same as 'spring' but difference is that spring gives us some bouncing effect but timing doesn't.
        Animated.timing(this.state.position,
        {
            toValue: { x: moveDirection, y: 0 },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false

        }).start(() => this.onSwipeComplete(direction));
    }

    forceSwipeLEFT = () =>
    {
        // same as 'spring' but difference is that spring gives us some bouncing effect but timing doesn't.
        Animated.timing(this.state.position,
        {
            toValue: { x: -SCREEN_WIDTH, y: 0 },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false

        }).start();
    }

    onSwipeComplete = direction =>
    {
        const { onSwipeLeft, onSwipeRight, data } = this.props;

        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        
        this.setState(prevState =>
        {
            return {
                index: prevState.index+1
            }
        })

        this.state.position.setValue({ x: 0, y: 0 });
    }

    resetPosition = () =>
    {
        Animated.spring(this.state.position,
        {
            toValue: { x: 0, y: 0 }
            
        }).start();
    }

    getCardStyle = () =>
    {
        const { position } = this.state;

        const rotate = position.x.interpolate(
        {
            inputRange: [-SCREEN_WIDTH*1.5, 0, SCREEN_WIDTH*1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        })

        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate }]
        };
    }

    renderCards = () =>
    {
        if(this.state.index === this.props.data.length)
        {
            return this.props.renderNoMoreCards();
        }

        return this.props.data.map((item, ind) =>
        {
            // console.log(this.state.index," ",ind);
            
            if(ind < this.state.index)
            {
                // console.log("Hey bro");

                return null;
            }
            else if(ind === this.state.index)
            {
                return (
                    <Animated.View
                        key = { item.id }
                        { ...this.state.panResponder.panHandlers } 
                        style = { [ this.getCardStyle(), styles.cardStyle, { zIndex: this.props.data.length-ind } ] }
                    >
                        { this.props.renderCard(item) }
                    </Animated.View>
                );
            }
            else
            {
                return (
                    <Animated.View 
                        key = { item.id } 
                        style = { [ styles.cardStyle, { top: 10*(ind-this.state.index), zIndex: this.props.data.length-ind } ] }
                    >
                        { this.props.renderCard(item) }
                    </Animated.View>
                );
            }
            
        }).reverse();
    } 

    render()
	{
		return (
            <View >
				{ this.renderCards() }
			</View>
		);
	}
}

const styles = StyleSheet.create(
{
    cardStyle:
    {
        // by mentioning position as absolute all the cards will stack on each other but causes side effect : all the cards will take that 
        // much space only that are required by the largest child of card ( space means width ). Hence we explicitly mention the width. By
        // default card which is at the last will stack as first element i.e first element which will be visible is the last one.
        position: "absolute",
        width: SCREEN_WIDTH
    }
})

export default Deck;