import React from 'react';
import CheckBox from 'react-native-check-box';

const Checkbox = ({ name, checked = false, onChange }) => {
    const {isChecked, setIsChecked} = useState();

    if (!isChecked)

    return (
        <CheckBox
            style={styles.checkBox}
            onClick={()=>{
                // setIsChecked(!isChecked);
                // addRemoveIngredient(ingredient);
                // console.log(this.isChecked);
                onChange(!checked,)
            }}
            isChecked={checked}
            // leftText={"CheckBox"}
            checkBoxColor="lightgray"
            checkedCheckBoxColor="lightblue"
        />
    )
}
export default Checkbox;