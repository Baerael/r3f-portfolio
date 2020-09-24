import React, {Fragment} from 'react';

const Test = () => {
  return (
    <div>

    <Alert.Warning>{(t) => {(
        <Link className="link" to="">
          {t('unpaid-amount-message')}
          &nbsp;
          {t('unpaid-amount-link')}
        </Link>
      )}
    }
    </Alert.Warning>
    </div>
  )
}

export default Test;
/*

    <Alert.Warning>{(t) => () 
      {t('unpaid-amount-message')}
      &nbsp;
      <Link className="link" to="">
        {t('unpaid-amount-link')}
      </Link>
    )}
  </Alert.Warning>


*/

