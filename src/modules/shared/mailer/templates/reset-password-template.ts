import {getTemplateLayout} from '.';
import {config} from './mail-template-config';

export const getResetPasswordTemplate = (buttonLink: string) => {
  const content = `
<table
  style="
    box-sizing: border-box;
    width: 100%;
    border-spacing: 0;
    border-collapse: separate !important;
  "
  width="100%"
>
  <tbody>
    <tr>
      <td
        style="
          box-sizing: border-box;
          padding: 0;
          font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
          font-size: 16px;
          vertical-align: top;
        "
        valign="top"
      >
        <h2
          style="
            margin: 0;
            margin-bottom: 30px;
            font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
            font-weight: 300;
            line-height: 1.5;
            font-size: 24px;
            color: #294661 !important;
            text-align: center;
          "
        >
          Hey 👋,<br />Did you forget your
          <b>${config.project.name}</b> password?<br />Let\'s
          reset your password.
        </h2>
      </td>
    </tr>
    <tr>
      <td
        style="
          box-sizing: border-box;
          padding: 0;
          font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
          font-size: 16px;
          vertical-align: top;
        "
        valign="top"
      >
        <table
          cellpadding="0"
          cellspacing="0"
          style="
            box-sizing: border-box;
            border-spacing: 0;
            width: 100%;
            border-collapse: separate !important;
          "
          width="100%"
        >
          <tbody>
            <tr>
              <td
                align="center"
                style="
                  box-sizing: border-box;
                  padding: 0;
                  font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
                  font-size: 16px;
                  vertical-align: top;
                  padding-bottom: 15px;
                "
                valign="top"
              >
                <table
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    box-sizing: border-box;
                    border-spacing: 0;
                    width: auto;
                    border-collapse: separate !important;
                  "
                >
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        bgcolor="${config.project.color}"
                        style="
                          box-sizing: border-box;
                          padding: 0;
                          font-family: \'Open Sans\',\'Helvetica Neue\',\'Helvetica\',Helvetica,Arial,sans-serif;
                          font-size: 16px;
                          vertical-align: top;
                          background-color: ${config.project.color};
                          border-radius: 2px;
                          text-align: center;
                        "
                        valign="top"
                      >
                        <a
                          href="${buttonLink}"
                          style="
                            box-sizing: border-box;
                            border-color: ${config.project.color};
                            font-weight: 400;
                            text-decoration: none;
                            display: inline-block;
                            margin: 0;
                            color: #ffffff;
                            background-color: ${config.project.color};
                            border: solid 1px
                              ${config.project.color};
                            border-radius: 2px;
                            font-size: 14px;
                            padding: 12px 45px;
                          "
                          target="_blank"
                          >Reset Password</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
`;

  return getTemplateLayout(content);
};
