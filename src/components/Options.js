import {useForm} from 'react-hook-form';

const RenderOptions = (options) => {
    const { register, watch } = useForm();
    const Register = options.register;
    let state = watch(options.index)
    console.log(options);
    console.log(state,"<<<");

    // const handleOptionChange = (optionIndex, value) => {
    //   options.onOptionChange(optionIndex, value);
    // };
   
    //renders the options according to the index
    return options.options.map((option, _index) => (
      <div className='flex items-center text-xs' key={`option-${_index}`}>
        <div className={`flex relative rounded-lg flex-1 m-1 ${state[options.index]!==option ? "bg-gray-200": "bg-blue-400 text-white"}`}>
          <div className='p-2'>{option}</div>
            <input 
            type="radio" 
            id={`option-${options.index}${_index}`} 
            name={`question-${options.index}`} 
            value={option} 
            className='flex-1 opacity-1 absolute w-full h-full inset-0'
            //style={{ display: 'none' }}
            {...register(`${options.index}`)}
            //onChange={() => handleOptionChange(options.index, option)}
            />
            <label htmlFor={` option-${options.index}-${_index}`}></label>
        </div>
      </div> 
    ))
  };

export default RenderOptions;